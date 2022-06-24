import PaidIcon from '@mui/icons-material/Paid';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
export default function InfoProduct({ infoProduct }) {
  return (
    <>
      <div className="userShow">
        <div className="userShowTop">
          <img src={infoProduct.image1} alt="" className="userShowImg" />
          <div className="userShowTopTitle">
            <h3 className="userShowUsername">{infoProduct.nameProduct}</h3>
          </div>
        </div>
        <div className="userShowBottom">
          <span className="userShowTitle">Thông Tin</span>
          <div className="userShowInfo mt-3">
            <PaidIcon className="userShowIcon" />
            <span className="userShowInfoTitle">
              {infoProduct.price},000 VND
            </span>
          </div>
          <div className="userShowInfo mt-3">
          <CollectionsBookmarkIcon className="userShowIcon" />
            <span className="userShowInfoTitle">
                    {infoProduct.collection}
            </span>
          </div>
          <div className="d-flex  userShowInfo">
            <div>   
                <span className="userShowIcon" >SizeM :</span>
                <span className="userShowInfoTitle">{infoProduct.sizeM},</span>
            </div>
            <div style={{marginLeft:"10px"}}>   
                <span className="userShowIcon" >SizeL : </span>
                <span className="userShowInfoTitle">{infoProduct.sizeL},</span>
            </div>
            <div style={{marginLeft:"10px"}}>   
                <span className="userShowIcon" >SizeXL : </span>
                <span className="userShowInfoTitle">{infoProduct.sizeXL}</span>
            </div>
          </div>
          <span className="userShowTitle">Giới Thiệu</span>
          <div className="userShowInfo mt-2">
            <span className="userShowInfoTitle m-lg-0">{infoProduct.description}</span>
          </div>
          <div className="d-flex">
            <div>
              <div className="userUpdateUpload mt-2">
                <img
                  className="userUpdateImg"
                  src={infoProduct.image1}
                  alt=""
                />{" "}
              </div>
              <span>Hình 1 </span>
            </div>
            <div>
              <div className="userUpdateUpload mt-2">
                <img
                  className="userUpdateImg"
                  src={infoProduct.image2}
                  alt=""
                />{" "}
              </div>
              <span>Hình 2 </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
