function DetailAddress({ detailAddress, setDetailAddress }) {
	const handleChangeCity = (event) => {
		const valueCity = event.target.value;
		if (!valueCity) {
			return setDetailAddress({
				...detailAddress,
				city: "",
				listProvince: [],
				listWard: [],
			});
		}
		const dataBeLongCity = detailAddress.listAddress.filter((el) => {
			return el.Id === valueCity;
		});
		const listDistrict = dataBeLongCity[0].Districts;

		setDetailAddress({
			...detailAddress,
			city: dataBeLongCity[0].Name,
			listProvince: listDistrict,
		});
	};

	const handleChangeProvince = (event) => {
		const valueProvince = event.target.value;
		if (!valueProvince) {
			return setDetailAddress({
				...detailAddress,
				province: "",
				listWard: [],
			});
		}
		const dataBeLongProvince = detailAddress.listProvince.filter((el) => {
			return el.Id === valueProvince;
		});
		const listWards = dataBeLongProvince[0].Wards;

		setDetailAddress({
			...detailAddress,
			province: dataBeLongProvince[0].Name,
			listWard: listWards,
		});
	};
	const handleChangeWard = (event) => {
		const value = event.target.value;
		if (!value) {
			return setDetailAddress({ ...detailAddress, listWard: [] });
		}
		const dataBeLongWard = detailAddress.listWard.filter((el) => {
			return el.Id === value;
		});
		setDetailAddress({
			...detailAddress,
			ward: dataBeLongWard[0].Name,
		});
	};
	return (
		<div className="row">
			<div className="col">
				<select
					style={{
						width: "100%",
						height: "",
					}}
					onChange={handleChangeCity}
					className="form-control"
				>
					<option value="">Chọn Tỉnh/Thành Phố</option>
					{detailAddress.listAddress.map((el, index) => {
						return (
							<option key={index} value={el.Id}>
								{el.Name}
							</option>
						);
					})}
				</select>
			</div>
			<div className="col">
				<select
					style={{
						width: "100%",
						height: "",
					}}
					className="form-control"
					onChange={handleChangeProvince}
				>
					<option value="">Chọn Quận/Huyện</option>
					{detailAddress.listProvince.length
						? detailAddress.listProvince.map((el, index) => {
								return (
									<option key={index} value={el.Id}>
										{el.Name}
									</option>
								);
						  })
						: null}
				</select>
			</div>
			<div className="col">
				<select
					style={{
						width: "100%",
						marginBottom: "40px",
					}}
					className="form-control"
					onChange={handleChangeWard}
				>
					<option value="">Chọn Phường/Xã</option>
					{detailAddress.listWard.length
						? detailAddress.listWard.map((el, index) => {
								return (
									<option key={index} value={el.Id}>
										{el.Name}
									</option>
								);
						  })
						: null}
				</select>
			</div>
		</div>
	);
}

export default DetailAddress;
