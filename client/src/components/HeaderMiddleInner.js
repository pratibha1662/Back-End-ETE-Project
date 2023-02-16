import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import IconsBar from './IconsBar'
import {Navbar, Nav } from 'react-bootstrap'
import useDevice from '../hooks/useDevice'
import { handleLogout } from '../store/slices/usuario'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { InstantSearch, Configure, connectSearchBox, connectHits  } from 'react-instantsearch-dom'
import { algoliaClient, ALGOLIA_INDEX_NAME } from '../services/algolia'

const animatedComponents = makeAnimated()

const SearchBox = ({ currentRefinement, funcion, submitFunction }) => (
	<form onSubmit={submitFunction}>
		<input autoComplete='off' value={currentRefinement} onChange={event => funcion(event.target.value)} name="search" placeholder="Buscar productos" type="search"/>
		<button  style={{height: '49px'}} className="btnn"><i className="ti-search"></i></button>
	</form>
)

const SearchBoxMobile = ({ currentRefinement, funcion, submitFunction }) => (
	<div className="search-top input">
		<form onSubmit={submitFunction} className="search-form">
			<input autoComplete='off' value={currentRefinement} onChange={event => funcion(event.target.value)} type="text" placeholder="Search here..." name="search"/>
			<button style={{height: '49px'}} value="search" type="submit"><i className="ti-search"></i></button>
		</form>
	</div>
)


const HeaderMiddleInner = () => {

	const dispatch = useDispatch()
	const { categorias } = useSelector(({categorias}) => categorias)
	const usuario = useSelector(({usuario}) => usuario)
	const isMobile = useDevice()
	const [activeSearch, setActiveSearch] = useState(false)
	const history = useHistory()
	const [search, setSearch] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('')

	const customStyles = {
		container: provided => ({
			...provided,
			width: 205,
			height: 48,
		}),
		valueContainer: (provided) => ({
			...provided,
			height: 47,
			position: 'initial'
		}),
	}

	const logout = (e) => {
		e.preventDefault()
		dispatch(handleLogout())
		history.push('/')
	}

	const handleChange = (value) => {
		setSearch(value)
	}

	const handleChangeCategory = ({value}) => {
		setSelectedCategory(value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		history.replace(`/buscar/${search}/${selectedCategory}`)
		return
	}

	const Hits = ({ hits }) => {
		return hits.filter(hit => selectedCategory === hit.categoria._id || !selectedCategory).map(hit => (
			<Link key={hit._id} to={`/product/${hit._id}`}>
				<div style={{display:'flex', flexDirection: 'row', backgroundColor: 'white', padding: '20px'}}>
					<div style={{width: '100px'}}>
						<img style={{width:'50%', heigth: 'auto'}} src={hit.img}></img>
					</div>
					<div style={{width: '185px'}}>
						<p>{hit.nombre}</p>
						<h6>$ {hit.precio}</h6>
					</div>
				</div>
			</Link>
		))
	}

	const CustomSearchBox = useCallback(connectSearchBox(SearchBox),[])
	const CustomSearchBoxMobile = useCallback(connectSearchBox(SearchBoxMobile), [])
	const CustomHits = useCallback(connectHits(Hits),[selectedCategory])
	

	return (
		<div className="middle-inner">
			<div className="container">
				<div className="row">
					{
						isMobile &&
							<div className="col-lg-2 col-md-12 col-12">

								<Navbar style={{width: '100%', backgroundColor: 'white !important',display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}} bg="light" expand="lg">

									<div className="logo" style={{display: 'flex'}}>
										<Link to="/"><img src="/images/logo.png" alt="logo"/></Link>
									</div>

									<IconsBar/>

									<div className={`search-top ${activeSearch ? 'active':''}`} style={{display: 'flex'}}>
										<div className="top-search"><a onClick={(e) => { e.preventDefault();setActiveSearch(!activeSearch)}} href="#0"><i style={{fontSize: `${isMobile ? '21px':'' }` }} className="ti-search"></i></a></div>

										<InstantSearch searchClient={algoliaClient} indexName={ALGOLIA_INDEX_NAME} hitsPerPage={3}>
											<CustomSearchBoxMobile  defaultRefinement={search} funcion={handleChange} showLoadingIndicator submitFunction={handleSubmit} />
											{
												search.length >=  3 ?
													<div style={{marginTop: '80px', height: '400px', overflowY: 'scroll'}}>
														<CustomHits />
													</div> : ''
											}
											<Configure
												hitsPerPage={4}
												analytics={false}
												enablePersonalization={false}
											/>
										</InstantSearch>

									</div>
									<Navbar.Toggle aria-controls="navbarScroll" />
									<Navbar.Collapse id="navbarScroll">
										<Nav
											className="mr-auto my-2 my-lg-0"
											style={{ maxHeight: '200px', marginLeft: '2px', fontWeight: 'bold', fontSize: '16px', width: '100%' }}
											navbarScroll
										>
											<ul>
												<li><Link to="/"><Nav.Link style={{fontWeight: 'bold'}} href="#action1">Home</Nav.Link></Link></li>
												<li><Link to="/categorias"><Nav.Link style={{fontWeight: 'bold'}} href="#action2">Categorias</Nav.Link></Link></li>
												{
													usuario.status === 'authenticated' ?
														<>
															<li><Nav.Link style={{fontWeight: 'bold'}} href="/misDatos">Mis datos</Nav.Link></li>
															<li><Nav.Link style={{fontWeight: 'bold'}} href="/wishlist">Mi lista de deseos</Nav.Link></li>
															<li><Nav.Link style={{fontWeight: 'bold'}} href="/misCompras">Mis compras</Nav.Link></li>
															<li><Nav.Link style={{fontWeight: 'bold'}} href="#" onClick={logout}>Salir</Nav.Link></li>
														</> :
														<li><Nav.Link style={{fontWeight: 'bold'}} href="login">Ingresar</Nav.Link></li>
												}
											</ul>
										</Nav>
									</Navbar.Collapse>
								</Navbar>
							</div>
					}

					{
						!isMobile &&
						<>
							<div className="col-lg-8 col-md-7 col-12" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

								<a style={{cursor: 'pointer'}} onClick={(e) => {e.preventDefault(); window.open('https://www.algolia.com', '_blank')}}><img width={150} src="https://upload.wikimedia.org/wikipedia/commons/6/69/Algolia-logo.svg"></img></a>

								<div className="search-bar-top">
									<div className="search-bar" style={{display: 'flex', flexDirection: 'row',zIndex: '99999'}}>

										<Select
											styles={customStyles}
											components={animatedComponents}
											selected={selectedCategory}
											onChange={handleChangeCategory}
											options={[{value: '', label: 'TODAS'}].concat(categorias.map(cat => {
												return {
													value: cat._id,
													label: cat.nombre
												}
											}))}
										/>
										<div style={{display: 'flex', flexDirection: 'column'}}>
											{
												<InstantSearch searchClient={algoliaClient} indexName={ALGOLIA_INDEX_NAME} hitsPerPage={3}>
													<CustomSearchBox submitFunction={handleSubmit}  defaultRefinement={search} funcion={handleChange} showLoadingIndicator />
													{
														search.length >=  3 && !history.location.pathname.includes('buscar') ?
															<CustomHits /> : ''
													}
													<Configure
														hitsPerPage={4}
														analytics={false}
														enablePersonalization={false}
													/>
												</InstantSearch>
											}
										</div>
									</div>
								</div>
							</div>
							<IconsBar/>
						</>
					}
				</div>
			</div>
		</div>
	)
}

export default HeaderMiddleInner
