import React from "react";
import { Nav, NavLink, NavMenu }
	from "./NavbarElements";

const Navbar = () => {
return (
	<>
	<Nav>
		<NavMenu>
		<NavLink to="/" activeStyle>
			Home
		</NavLink>

		<NavLink to="/registration" activeStyle>
			Registration
		</NavLink>
		
		<NavLink to="/login" activeStyle>
			Login
		</NavLink>

		<NavLink to="/items" activeStyle>
			Items
		</NavLink>

		<NavLink to="/createOrder" activeStyle>
			Order
		</NavLink>

		<NavLink to="/logout" activeStyle>
			LogOut
		</NavLink>
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
