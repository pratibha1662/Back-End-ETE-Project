const TopBar = () => {
	return (
		<div className="topbar">
			<div className="container">
				<div className="row">
					<div className="col-lg-5 col-md-12 col-12">

						<div className="top-left">
							<ul className="list-main">
								<li><i className="ti-headphone-alt"></i> +060 (800) 801-582</li>
								<li><i className="ti-email"></i> support@shophub.com</li>
							</ul>
						</div>

					</div>
					<div className="col-lg-7 col-md-12 col-12">
						<div className="right-content">
							<ul className="list-main">
								<li><i className="ti-location-pin"></i> Store location</li>
								<li><i className="ti-alarm-clock"></i> <a href="#">Daily deal</a></li>
								<li><i className="ti-user"></i> <a href="#">My account</a></li>
								<li><i className="ti-power-off"></i><a href="login.html#">Login</a></li>
							</ul>
						</div>

					</div>
				</div>
			</div>
		</div>
	)
}

export default TopBar
