import React from "react";

function Footer() {
	let year = new Date().getUTCFullYear();
	return (
		<footer className="footer">
			<p>
				&copy; {year} By{" "}
				<a href="https://github.com/Ahmed-Oraby" target="_blank" rel="noreferrer">
					Ahmed&nbsp;Oraby
				</a>
			</p>
		</footer>
	);
}

export default Footer;
