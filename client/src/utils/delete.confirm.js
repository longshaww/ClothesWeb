import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
export const deleteConfirm = async (deleteMsg, cancelMsg, doOnDelete) => {
	const result = await MySwal.fire({
		title: "Bạn có chắc muốn xóa?",
		text: "Bạn không thể hoàn tác hành động này!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonText: "Xóa",
		cancelButtonText: "Hủy",
		reverseButtons: true,
	});
	if (result.isConfirmed) {
		MySwal.fire("Deleted!", deleteMsg, "success");
		doOnDelete();
	} else if (
		/* Read more about handling dismissals below */
		result.dismiss === Swal.DismissReason.cancel
	) {
		MySwal.fire("Cancelled", cancelMsg, "error");
	}
};
