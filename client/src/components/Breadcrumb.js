import { Link } from 'react-router-dom'

const Breadcrumb = ({routes}) => {
	return (
		<div className="breadcrumbs">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="bread-inner">
							<ul className="bread-list">
								<li><Link to="/">Home<i className="ti-arrow-right"></i></Link></li>
								{
									routes.map(route =>  <li key={route.name} className={route.active ? 'active':''}><Link to={`/${route.route}`}>{route.name} <i className="ti-arrow-right"></i></Link></li>)
								}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Breadcrumb
