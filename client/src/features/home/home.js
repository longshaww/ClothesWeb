import "../../assets/styles/home.css";
export default function Home() {

  return (
    <div>
      <div class="highclub">
        <div
          id="carouselExampleCrossfade"
          class="carousel slide carousel-fade"
          data-mdb-ride="carousel"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-mdb-target="#carouselExampleCrossfade"
              data-mdb-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-mdb-target="#carouselExampleCrossfade"
              data-mdb-slide-to="1"
              aria-label="Slide 2"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src="https://file.hstatic.net/200000280689/file/z3348729026989_9c0ae4e743f8ed91ed2bf4409071b3fe_209e24f5c1e143ff9c1fb6952d46159d.jpg"
                class="d-block w-100"
                alt=""
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://file.hstatic.net/200000280689/file/z3348729031595_bc4693744958b1ae1cfff67b6fd492bf_9f6fe89750a8485ebddd2919d75a1c6c.jpg"
                class="d-block w-100"
                alt=""
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-mdb-target="#carouselExampleCrossfade"
            data-mdb-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-mdb-target="#carouselExampleCrossfade"
            data-mdb-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="container-fluid">
            <p class="fs-1 text-uppercase text-center mt-5 mb-3 font_title">highclub - style</p>
            <div class="row">
                <div class="col-md-4 px-1 banner_item">
                    <img src="https://file.hstatic.net/200000280689/file/img_3988_580b7cd5e8814412b28c66a063f30fe3.jpeg" class="img-fluid"/>
                </div>
                <div class="col-md-4 px-1 banner_item">
                    <img src="https://file.hstatic.net/200000280689/file/img_3748_a989988ac9bd419a9ebbaf4ab6a2fd26.jpeg" class="img-fluid"/>
                </div>
                <div class="col-md-4 px-1 banner_item">
                    <img src="https://file.hstatic.net/200000280689/file/img_2582_025e7302be154b05997b6f0a2ef6715d.jpeg" class="img-fluid"/>
                </div>
            </div>
        </div>
      <div class="">
            <p class="fs-1 text-uppercase text-center mt-5 mb-3 font_title">New Arrivals</p>
            <div class="container p-0"> 
              <ul class="row row-cols-3 p-0">
              <li class="col">
                        <p class="product mx-3 my-2">
                            <a href="#">
                                <img src="https://product.hstatic.net/200000280689/product/bit_tr_trc_48cb018a5258424ba8ac0859d2a1141d_grande.jpg" alt="" class="img-fluid"/>  
                            </a>
                            <a href="#">
                                <img src="https://product.hstatic.net/200000280689/product/bit_tr_s_4c0be69053e346fc86d311fbac6e4d3a_grande.jpg" alt="" class="img-fluid product_back-side"/>
                            </a>
                        </p>
                        <a class="text-center fw-bold text-decoration-none text-dark">
                            <p class="fs-5 mb-2">
                                Bitcoin Tee - White
                            </p>
                            <p class="">
                                380,000₫
                            </p>
                        </a>
                    </li>
               </ul>

            
            
            </div>
      </div>
    </div>
  );
}
