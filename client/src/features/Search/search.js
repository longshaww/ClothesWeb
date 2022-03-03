import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardImg, CardBody, CardGroup } from "reactstrap";
import { Link } from "react-router-dom";

// Phú PLAY CODE
export default function Search() {
  const [searchParams] = useSearchParams();
  const [dataSearch, setDataSearch] = useState([]);
  useEffect(() => {
    const query = searchParams.get("q");
    async function fetchData() {
      const requestAPI = await axios.get(
        `http://localhost:4000/search?q=${query}`
      );
      const data = await requestAPI.data;
      setDataSearch(data);
    }
    fetchData();
  }, [searchParams]);

  return (
    <>
      <CardGroup>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 ">
          {dataSearch.map((el) => {
            return (
              <Card key={el._id} className="col border-0 ">
                <CardImg
                  alt="Card image cap"
                  src={el.description.imageList[0]}
                  width="100%"
                />
                <CardBody>
                  <div className="text-center">
                    <p>{`${el.nameProduct}`}</p>
                    <p className="text-muted">{`${el.description.price}`}</p>
                  </div>
                    <Link
                      to={`/products/${el.nameProduct}`}
                      state={{
                        elName: el.nameProduct,
                        elImage:
                          el.description
                            .imageList[0],
                      }}
                      className="stretched-link"
                    ></Link>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </CardGroup>
    </>
  );
}
