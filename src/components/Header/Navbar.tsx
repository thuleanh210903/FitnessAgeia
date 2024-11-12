import { DropdownNotification } from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 flex w-full border-b bg-white">
      <div className="flex flex-grow items-center justify-between px-4 py-5">
        <div className="lg:block hidden">
          <div>
            <h1 className="font-bold">Dashboard</h1>
            <p className="font-medium">Admin dashboard</p>
          </div>
        </div>

        <div className="flex items-center justify-normal gap-2 2xl:gap-4 lg:w-full lg:justify-between xl:w-auto xl:justify-normal">
          <ul className="flex items-center gap-2 2xl:gap-4">
            {/* <SearchForm /> */}
            <DropdownNotification />
          </ul>

          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
