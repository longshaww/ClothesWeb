import PaidIcon from '@mui/icons-material/Paid';
import { Collapse } from 'react-collapse';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { useState } from 'react';
import Toast from '../../../utils/toast';
import axios from 'axios';
export default function InfoProduct({ infoProduct, idProduct, accessToken, setDataDetail }) {
    const [statusShow, setStatusShow] = useState({
        image1: false,
        image2: false,
    });
    const [showImage, setShowImage] = useState({
        showImage1: null,
        showImage2: null,
    });
    const handleShowImage1 = () => {
        statusShow.image1 === true
            ? setStatusShow({ ...statusShow, image1: false })
            : setStatusShow({ ...statusShow, image1: true });
    };
    const handleShowImage2 = () => {
        statusShow.image2 === true
            ? setStatusShow({ ...statusShow, image2: false })
            : setStatusShow({ ...statusShow, image2: true });
    };

    const handleChangeImage = async (e) => {
        const value = e.target.files[0];
        setShowImage({
            ...showImage,
            [e.target.name]: URL.createObjectURL(value),
        });
    };
    const excuteFunctionPutImage = async (index) => {
        const image = index === '1' ? showImage.showImage1 : showImage.showImage2;
        console.log(image);
        if (image !== null) {
            let file = await fetch(image)
                .then((r) => r.blob())
                .then(
                    (blobFile) =>
                        new File(
                            [blobFile],
                            index === '1' ? `image1${idProduct}.png` : `image2${idProduct}.png`,
                            { type: 'image/png' }
                        )
                );
            const formData = new FormData();
            formData.append('image', file);
            formData.append('index', index);
            const { data } = await axios.put(
                `${process.env.REACT_APP_API_URL}admin/products/editImage/${idProduct}`,
                formData,
                {
                    headers: {
                        authorization: 'Bearer ' + accessToken,
                    },
                }
            );
            if (data.success === true) {
                setShowImage({ showImage1: null });
                setDataDetail(data.customData);
                Toast.fire({
                    title: 'Cập Nhật Thành Công',
                    icon: 'success',
                });
            } else {
                Toast.fire({
                    title: 'Cập Nhật Thất Bại',
                    icon: 'error',
                });
            }
        } else {
            Toast.fire({
                title: 'Chọn hình ảnh để cập nhật',
                icon: 'error',
            });
        }
    };
    const handleClickUpdateImage = async (e) => {
        try {
            if (e.target.value === '1') {
                excuteFunctionPutImage(e.target.value);
            } else if (e.target.value === '2') {
                excuteFunctionPutImage(e.target.value);
            }
        } catch (err) {
            Toast.fire({
                title: 'Xảy ra lỗi',
                icon: 'error',
            });
        }
    };

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
                        <span className="userShowInfoTitle">{infoProduct.price},000 VND</span>
                    </div>
                    <div className="userShowInfo mt-3">
                        <CollectionsBookmarkIcon className="userShowIcon" />
                        <span className="userShowInfoTitle">{infoProduct.collection}</span>
                    </div>
                    <div className="d-flex  userShowInfo">
                        <div>
                            <span className="userShowIcon">SizeM :</span>
                            <span className="userShowInfoTitle">{infoProduct.sizeM},</span>
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                            <span className="userShowIcon">SizeL : </span>
                            <span className="userShowInfoTitle">{infoProduct.sizeL},</span>
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                            <span className="userShowIcon">SizeXL : </span>
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
                                    onClick={handleShowImage1}
                                />{' '}
                            </div>
                            <span>Hình 1 </span>
                            <Collapse isOpened={statusShow.image1}>
                                <div>
                                    <input
                                        accept="image/*"
                                        type="file"
                                        name="showImage1"
                                        onChange={handleChangeImage}
                                        id="imgInp"
                                    />
                                    {showImage.showImage1 ? (
                                        <>
                                            <img
                                                className="userUpdateImg mt-3"
                                                id="blah"
                                                src={showImage.showImage1}
                                                alt="Hình Ảnh Của Bạn"
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                value="1"
                                                onClick={handleClickUpdateImage}
                                            >
                                                Cập Nhật
                                            </button>
                                        </>
                                    ) : null}
                                </div>
                            </Collapse>
                        </div>
                        <div>
                            <div className="userUpdateUpload mt-2">
                                <img
                                    className="userUpdateImg"
                                    src={infoProduct.image2}
                                    alt=""
                                    onClick={handleShowImage2}
                                />{' '}
                            </div>
                            <span>Hình 2 </span>
                            <Collapse isOpened={statusShow.image2}>
                                <div>
                                    <input
                                        accept="image/*"
                                        type="file"
                                        id="imgInp"
                                        name="showImage2"
                                        className="mt-2"
                                        onChange={handleChangeImage}
                                        title=" "
                                    />
                                    {showImage.showImage2 !== null ? (
                                        <>
                                            <img
                                                className="userUpdateImg mt-3"
                                                id="blah"
                                                src={showImage.showImage2}
                                                alt="Hình Ảnh Của Bạn"
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                value="2"
                                                onClick={handleClickUpdateImage}
                                            >
                                                Cập Nhật
                                            </button>
                                        </>
                                    ) : null}
                                </div>
                            </Collapse>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
