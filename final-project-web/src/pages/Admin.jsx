import { NavLink, Outlet } from "react-router-dom";

export default function Admin() {
    return (
        <>
            <div style={{ backgroundColor: "beige" }}>
                <h1>Admin Page</h1>
                <NavLink to="/">Home</NavLink>
                <div style={{ border: "dashed grey 2px" }}>
                    <Outlet />
                </div>
            </div>
        </>
    );
}
