import { useState } from "react";
import Toast from "../../../utils/toast";
import axios from "axios";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";

const options = [
	{ id: "621c506fbae8653bcb4564ac", typeName: "Tops" },
	{ id: "621c50a7bae8653bcb4564b1", typeName: "Bottoms" },
	{ id: "621c50c7bae8653bcb4564b3", typeName: "Outerwears" },
	{ id: "621c50e0bae8653bcb4564b4", typeName: "Accessories" },
	{ id: "6295e2c2edafd2b5ebe66cd3", typeName: "NewArrivals" },
];

export default function CreateProduct() {
	const [cookies] = useCookies();
	const [dataProduct, setDataProduct] = useState({
		nameProduct: "",
		idCollection: "621c506fbae8653bcb4564ac",
		price: "",
		productDes: "",
		sizeM: "",
		sizeL: "",
		sizeXL: "",
	});
	const [showImage, setShowImage] = useState({
		showImage1: null,
		showImage2: null,
	});
	const handleChangeSelectBox = (e) =>
		setDataProduct({ ...dataProduct, idCollection: e.target.value });

	const handleChangeImage = async (e) => {
		const value = e.target.files[0];
		setShowImage({
			...showImage,
			[e.target.name]: URL.createObjectURL(value),
		});
	};

	const handleChangeDataProduct = (e) => {
		const value = e.target.value;
		setDataProduct({
			...dataProduct,
			[e.target.name]: value,
		});
	};
	const handleClickCreate = async () => {
		try {
			if (
				dataProduct.idCollection === "" ||
				dataProduct.nameProduct === "" ||
				dataProduct.price === "" ||
				dataProduct.productDes === "" ||
				dataProduct.sizeL === "" ||
				dataProduct.sizeM === "" ||
				dataProduct.sizeXL === "" ||
				showImage.showImage1 === null ||
				showImage.showImage2 === null
			) {
				Toast.fire({
					title: "Vui Lòng Điền Đầy Đủ Thông Tin",
					icon: "error",
				});
			} else {
				let file1 = await fetch(showImage.showImage1)
					.then((r) => r.blob())
					.then(
						(blobFile) =>
							new File(
								[blobFile],
								`image1${uuidv4()}.png`,
								{ type: "image/png" }
							)
					);
				let file2 = await fetch(showImage.showImage2)
					.then((r) => r.blob())
					.then(
						(blobFile) =>
							new File(
								[blobFile],
								`image2${uuidv4()}.png`,
								{ type: "image/png" }
							)
					);
				const formData = new FormData();
				formData.append("image", file1);
				formData.append("image", file2);
				formData.append("nameProduct", dataProduct.nameProduct);
				formData.append("idCollection", dataProduct.idCollection);
				formData.append("price", dataProduct.price);
				formData.append("productDes", dataProduct.productDes);
				formData.append("sizeM", dataProduct.sizeM);
				formData.append("sizeL", dataProduct.sizeL);
				formData.append("sizeXL", dataProduct.sizeXL);
				const { data } = await axios.post(
					`${process.env.REACT_APP_API_URL}admin/products/createProduct`,
					formData,
					{
						headers: {
							authorization:
								"Bearer " + cookies.accessToken,
						},
					}
				);
				if (data.success) {
					Toast.fire({
						title: "Cập Nhật Thành Công",
						icon: "success",
					});
					setDataProduct({
						nameProduct: "",
						idCollection: "621c506fbae8653bcb4564ac",
						price: "",
						productDes: "",
						sizeM: "",
						sizeL: "",
						sizeXL: "",
					});
					setShowImage({
						showImage1: null,
						showImage2: null,
					});
					window.location.href = `/admin/products/${data.product._id}`;
				}
			}
		} catch (err) {
			Toast.fire({
				title: "Đã xảy ra lỗi",
				icon: "error",
			});
		}
	};
	return (
		<div className="p-5 shadow mx-3" style={{ flex: 4 }}>
			<h3 className="text-center">Tạo Sản Phẩm</h3>
			<div className="newUserForm">
				<div className="newUserItem">
					<label>Tên Sản Phẩm</label>
					<input
						type="text"
						placeholder="VD :T-SHIRT HIGHCLUB"
						name="nameProduct"
						className="form-control"
						value={dataProduct.nameProduct}
						onChange={handleChangeDataProduct}
					/>
				</div>
				<div className="newUserItem ">
					<label>Loại</label>
					<select
						className="form-control"
						value={dataProduct.idCollection}
						onChange={handleChangeSelectBox}
					>
						{options.map((item) => {
							return (
								<option key={item.id} value={item.id}>
									{item.typeName}
								</option>
							);
						})}
					</select>
				</div>
				<div className="newUserItem">
					<label>Giá Giao Động</label>
					<input
						className="form-control"
						type="number"
						placeholder="VD :600"
						name="price"
						value={dataProduct.price}
						onChange={handleChangeDataProduct}
					/>
				</div>
				<div className="newUserItem">
					<label>size M</label>
					<input
						className="form-control"
						type="number"
						name="sizeM"
						value={dataProduct.sizeM}
						onChange={handleChangeDataProduct}
					/>
				</div>
				<div className="newUserItem">
					<label>size L</label>
					<input
						className="form-control"
						type="number"
						name="sizeL"
						value={dataProduct.sizeL}
						onChange={handleChangeDataProduct}
					/>
				</div>
				<div className="newUserItem">
					<label>size XL</label>
					<input
						className="form-control"
						type="number"
						name="sizeXL"
						value={dataProduct.sizeXL}
						onChange={handleChangeDataProduct}
					/>
				</div>
				<div className="">
					<div className="newUserItem">
						<label>Giới Thiệu</label>
						<textarea
							name="productDes"
							value={dataProduct.productDes}
							onChange={handleChangeDataProduct}
							className="form-control"
						/>
					</div>
					<div className="mt-5">
						<input
							className="form-control"
							accept="image/*"
							type="file"
							id="imgInp"
							name="showImage1"
							onChange={handleChangeImage}
							title=" "
						/>
						<img
							className="userUpdateImg mt-3"
							id="blah"
							src={showImage.showImage1}
							hidden={!showImage.showImage1}
							alt="Hình Ảnh Của Bạn"
						/>
					</div>
					<div className="mt-5">
						<input
							className="form-control"
							accept="image/*"
							type="file"
							id="imgInp"
							name="showImage2"
							onChange={handleChangeImage}
							title=" "
						/>
						<img
							className="userUpdateImg mt-3"
							id="blah"
							src={showImage.showImage2}
							hidden={!showImage.showImage2}
							alt="Hình Ảnh Của Bạn"
						/>
					</div>
				</div>
			</div>
			<div className="text-center mt-5">
				<button
					type="button"
					className="btn btn-success"
					onClick={handleClickCreate}
				>
					Tạo
				</button>
			</div>
		</div>
	);
}
