import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

const Slides = ({images}) => {

	return (
		<Fade>
			{
				images.map(img => (
					<div key={img} className="each-fade">
						<div>
							<img alt={img} src={img} />
						</div>
					</div>
				))
			}
		</Fade>
	)
}

export default Slides
