const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");
module.exports = {
  mailOptionsSendOTP: (otp,email) => {
    return {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Xác Nhận Email Của Bạn",
      html: `<div id=":q3" class="ii gt" jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0."><div id=":q4" class="a3s aiL "><u></u> 
				 <div style="margin:0">
						  <table style="border-spacing:0;border-collapse:collapse;height:100%!important;width:100%!important">
							<tbody><tr>
							  <td style="font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,&quot;Roboto&quot;,&quot;Oxygen&quot;,&quot;Ubuntu&quot;,&quot;Cantarell&quot;,&quot;Fira Sans&quot;,&quot;Droid Sans&quot;,&quot;Helvetica Neue&quot;,sans-serif">
								
					  <table style="border-spacing:0;border-collapse:collapse;width:100%;margin:40px 0 20px">
						<tbody><tr>
						  <td style="font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,&quot;Roboto&quot;,&quot;Oxygen&quot;,&quot;Ubuntu&quot;,&quot;Cantarell&quot;,&quot;Fira Sans&quot;,&quot;Droid Sans&quot;,&quot;Helvetica Neue&quot;,sans-serif">
							<center>
					  
							  <table style="border-spacing:0;border-collapse:collapse;width:560px;text-align:left;margin:0 auto">
								<tbody><tr>
								  <td style="font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,&quot;Roboto&quot;,&quot;Oxygen&quot;,&quot;Ubuntu&quot;,&quot;Cantarell&quot;,&quot;Fira Sans&quot;,&quot;Droid Sans&quot;,&quot;Helvetica Neue&quot;,sans-serif">
					  
									<table style="border-spacing:0;border-collapse:collapse;width:100%">
									  <tbody><tr>
										<td style="font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,&quot;Roboto&quot;,&quot;Oxygen&quot;,&quot;Ubuntu&quot;,&quot;Cantarell&quot;,&quot;Fira Sans&quot;,&quot;Droid Sans&quot;,&quot;Helvetica Neue&quot;,sans-serif">
										  
											<h1 style="font-weight:normal;margin:0;font-size:30px;color:#333">
											  <a href="${process.env.URL_FRONTEND}" style="font-size:30px;text-decoration:none;color:#333" target="_blank">HIGHBAR</a>
											</h1>
										  
										</td>
					  
									  </tr>
									</tbody></table>
					  
								  </td>
								</tr>
							  </tbody></table>
					  
							</center>
						  </td>
						</tr>
					  </tbody></table>
					  
								<table style="border-spacing:0;border-collapse:collapse;width:100%">
						<tbody><tr>
						  <td style="font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,&quot;Roboto&quot;,&quot;Oxygen&quot;,&quot;Ubuntu&quot;,&quot;Cantarell&quot;,&quot;Fira Sans&quot;,&quot;Droid Sans&quot;,&quot;Helvetica Neue&quot;,sans-serif;padding-bottom:40px">
							<center>
							  <table style="border-spacing:0;border-collapse:collapse;width:560px;text-align:left;margin:0 auto">
								<tbody><tr>
								  <td style="font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,&quot;Roboto&quot;,&quot;Oxygen&quot;,&quot;Ubuntu&quot;,&quot;Cantarell&quot;,&quot;Fira Sans&quot;,&quot;Droid Sans&quot;,&quot;Helvetica Neue&quot;,sans-serif">
									
								  <h2 style="font-weight:normal;margin:0;font-size:24px;margin-bottom:10px;color:black;">Chào mừng bạn đến với HIGHBAR! </h2>
								  <p style="margin:0;color:#777;line-height:150%;font-size:16px"><span style="color:#74686f;">Mã Xác Nhận Của Bạn Là:</span><h2 style="font-weight:normal;margin:0;font-size:24px;margin-bottom:10px;color:black;">${otp}</h2></p>								  
									<table style="border-spacing:0;border-collapse:collapse;width:100%;margin-top:20px">
									  <tbody><tr>
										<td style="font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,&quot;Roboto&quot;,&quot;Oxygen&quot;,&quot;Ubuntu&quot;,&quot;Cantarell&quot;,&quot;Fira Sans&quot;,&quot;Droid Sans&quot;,&quot;Helvetica Neue&quot;,sans-serif">
										  <table style="border-spacing:0;border-collapse:collapse;float:left;margin-right:15px">
											<tbody><tr>
											  <td style="font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,&quot;Roboto&quot;,&quot;Oxygen&quot;,&quot;Ubuntu&quot;,&quot;Cantarell&quot;,&quot;Fira Sans&quot;,&quot;Droid Sans&quot;,&quot;Helvetica Neue&quot;,sans-serif;text-align:center;padding:20px 25px;border-radius:4px;background:#1666a2"><a href="${process.env.URL_FRONTEND}" style="font-size:16px;text-decoration:none;color:#fff" target="_blank" >Đến cửa hàng của chúng tôi</a></td>
											</tr>
										  </tbody></table>
										</td>
									  </tr>
									</tbody></table>
								  
					  
								  </td>
								</tr>
							  </tbody></table>
							</center>
						  </td>
						</tr>
					  </tbody></table>
								<table style="border-spacing:0;border-collapse:collapse;width:100%;border-top:1px solid #e5e5e5">
						<tbody><tr>
						  <td style="font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,&quot;Roboto&quot;,&quot;Oxygen&quot;,&quot;Ubuntu&quot;,&quot;Cantarell&quot;,&quot;Fira Sans&quot;,&quot;Droid Sans&quot;,&quot;Helvetica Neue&quot;,sans-serif;padding:35px 0">
							<center>
							  <table style="border-spacing:0;border-collapse:collapse;width:560px;text-align:left;margin:0 auto">
								<tbody><tr>
								  <td style="font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,&quot;Roboto&quot;,&quot;Oxygen&quot;,&quot;Ubuntu&quot;,&quot;Cantarell&quot;,&quot;Fira Sans&quot;,&quot;Droid Sans&quot;,&quot;Helvetica Neue&quot;,sans-serif">
									<p style="margin:0;color:#999;line-height:150%;font-size:14px">Nếu bạn có bất cứ câu hỏi nào, đừng ngần ngại liên lạc với chúng tôi tại <a href="mailto:ngocphupham03@gmail.com" style="font-size:14px;text-decoration:none;color:#1666a2" target="_blank">ngocphupham03@gmail.com</a></p>
								  </td>
								</tr>
							  </tbody></table>
							</center>
						  </td>
						</tr>
					  </tbody></table>
					  
					  <img src="https://ci4.googleusercontent.com/proxy/AkPYSwbfCTPpa9UY2iemTt-8uuNCxd9wMi-MxiDXCwCclRn4IrvavPQy53Rok8pDmYePvpYw7glbcjctupZqDJjD9WVBMoR1vQ=s0-d-e1-ft#http://hstatic.net/0/0/global/notifications/spacer.png" height="0" style="min-width:600px;height:0" class="CToWUd">
					  
							  </td>
							</tr>
						  </tbody></table><div class="yj6qo"></div><div class="adL">
						
					  </div></div><div class="adL">
					  </div></div></div>`,
    };
  },
  
};


