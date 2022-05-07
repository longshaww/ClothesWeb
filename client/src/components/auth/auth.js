import Badge from "@mui/material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";

function Auth() {
  // HANDLE OPEN TABLE CLOSE TABLE
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //MUI Cart Open handle
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Badge color="primary">
      <AccountCircleIcon
        onClick={handleClick}
        aria-describedby={id}
        variant="contained"
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "mid",
        }}
      >
        <Box
          sx={{
            width: "338px",
            height: "354px",
            padding: "20px 15px",
          }}
        >
          <div id="cart-container" class="py-0 px-3">
            <div class="text-center" data-metatip="true">
              <h6 style={{ marginBottom: "2px" }}>ĐĂNG NHẬP TÀI KHOẢN</h6>
              <p class="mt-0">
                <small>Nhập email và mật khẩu của bạn</small>
              </p>
            </div>

            <div class="form-group">
              <input
                type="email"
                class="form-control"
                id="exampleDropdownFormEmail1"
                placeholder="Email"
              ></input>
            </div>
            <div class="form-group mt-3">
              <input
                type="password"
                class="form-control"
                id="exampleDropdownFormPassword1"
                placeholder="Password"
              ></input>
            </div>
            <div class="footer mt-2">
              <em>
                This site is protected by reCAPTCHA and the Google
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>
                and{" "}
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noreferrer"
                  data-metatip="true"
                  data-selected="true"
                  data-label-id="0"
                >
                  Terms of Service
                </a>{" "}
                apply.
              </em>
            </div>
            <div>
              <button
                type="button"
                style={{ height: "40px" }}
                class="col-12  mt-1  btn btn-secondary btn-sm btn-block"
              >
                ĐĂNG NHẬP
              </button>
            </div>
            <div class="text-center">
              <a class="link" href="/account/register">
                Tạo tài khoản
              </a>{" "}
              <br></br>
              <a class="link" href="/account/register">
                Bạn đã quên mật khẩu ?{" "}
              </a>
            </div>
          </div>
        </Box>
      </Popover>
    </Badge>
  );
}

export default Auth;
