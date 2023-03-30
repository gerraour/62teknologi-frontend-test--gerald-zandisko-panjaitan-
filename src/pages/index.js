import Head from 'next/head'
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faFilter,
  faCaretDown
} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import useSWR from 'swr';

export default function Home() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR('/api/staticdata', fetcher);

  if (error) return <div></div>;
  if (!data) return <div></div>;
  
  const business = JSON.parse(data);
  console.log(business)

  return (
    <>
      <Head>
        <title>Business Search</title>
        <meta name="description" content="Business search app based on yelp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        <ul>
        </ul>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center fw-light mt-5">Business Search App</h1>
              {/* Search Form */}
              <div className="input-group mt-5 shadow-sm">
                <span className="input-group-text border-0 p-4">
                  <FontAwesomeIcon icon={faMagnifyingGlass} style={{ width: 20, height: 20 }} /> 
                </span>
                <input type="text" className="form-control border-0" placeholder="Cari" aria-label="Cari"></input>
              </div>
              {/* Search Form */}
              <div className="container">
                <div className="row">
                  <div className="col-md-3 mt-5 rounded p-4">
                    <div className="d-flex">
                      <p className="mb-0 fw-bold">
                        <span className="me-2">
                          <FontAwesomeIcon icon={faFilter} />
                        </span>
                        FILTER
                      </p>
                    </div>
                    <div>
                      <a className="btn d-flex justify-content-between align-items-center collapse-button border-0" data-bs-toggle="collapse" href="#collapseCategory" role="button" aria-expanded="false" aria-controls="#collapseCategory">
                        <p className="mt-3 fw-bold">Category</p>
                        <FontAwesomeIcon icon={faCaretDown} />
                      </a>
                      <div className="collapse" id="collapseCategory">
                        {business.businesses.map((item, index) => (
                          <div key={index}>
                            {item.categories.map((cat, index) => (
                              <div className="form-check mb-3" key={index}>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                <label className="form-check-label" for="flexCheckDefault">
                                  {cat.title}
                                </label>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-9 p-4">
                    {/* Table */}
                    <table className="table table-hover mt-5">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Photo</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      {business.businesses.map((item, index) => (
                        <tbody>
                          <tr>
                            <th scope="row" key={item.id}>{index + 1}</th>
                            <td>
                              <Link
                                href={{
                                  pathname: "/details",
                                  query: {
                                    id: item.id,
                                    name: item.name,
                                    url: item.image_url,
                                    rating: item.rating,
                                    review: item.review_count,
                                    status: item.is_closed,
                                  },
                                }}
                                as={`/details/${item.id}`}
                                className="table-link"
                              >
                                {item.name}
                              </Link>
                            </td>
                            <td>
                              <img src={item.image_url} width={ 100 } height={ 50 } className="business-image" />
                            </td>
                            <td>
                              {item.phone === '' ? <p className="mb-0 not-available">n/a</p> : <p className="mb-0">{item.phone}</p>}
                            </td>
                            <td>
                              {item.is_closed === true ? <p className="mb-0 open-text">Open</p> : <p className="mb-0 close-text">Close</p>}
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                    {/* Pagination */}
                    <nav aria-label="Table Pagination" className="mt-5">
                      <ul className="pagination justify-content-center">
                        <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
