import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from "next/router"
import ReactStars from 'react-stars'

export default function Details() {
	const router = useRouter()
	const {
		query: {
			id,
			name,
			url,
			rating,
			review,
			status,
		},
	} = router
  return (
    <>
			<Head>
        <title>{name} - Business Search</title>
        <meta name="description" content="Business search details based on selected data" />
      </Head>
			<main>
				{/* Detail */}
				<div className="container my-5">
					<div className="row">
						{/* Navigation */}
						<div className="mb-4">
							<nav aria-label="breadcrumb">
								<ol className="breadcrumb">
									<li className="breadcrumb-item">
										<Link href="/" className="detail-nav">Home</Link>
									</li>
									<li className="breadcrumb-item active" aria-current="page">
										{name}
									</li>
								</ol>
							</nav>
						</div>
						<div className="col-3">
							<img src={url} className="image-detail rounded shadow"></img>
							<div>
								<h2 className="mt-4 fw-light">Location</h2>
								<iframe
									height="350"
									className="w-100 rounded shadow mt-3"
									loading="lazy"
									allowfullscreen
									src="http://maps.google.com/maps?q=24.197611,120.780512"
								/>
							</div>
						</div>
						<div className="col-9">
							<div className="d-flex">
								<div className="flex-grow-1">
									{status === 'true' ?
										<div className="status-label-open rounded mb-3">
											<h5 className="fw-light mb-0 text-white">
												<p className="mb-0">Open</p>
											</h5>
										</div>
										:
										<div className="status-label-close rounded mb-3">
											<h5 className="fw-light mb-0 text-white">
												<p className="mb-0">Close</p>
											</h5>
										</div>
									}
									<h1 className="fw-light">{name}</h1>
								</div>
								<div className="d-flex flex-column align-items-end">
									<p className="fw-semibold mb-0">{review} customer reviews</p>
									<ReactStars count={5} value={rating} size={26} edit={false} color2={'#FF8000'} />
									<p className="fw-light mb-0">{rating} out of 5 stars</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
    </>
  );
}