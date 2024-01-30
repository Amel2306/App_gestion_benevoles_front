import React from "react";
import { Link } from "react-router-dom";

import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  PuzzlePieceIcon,
  HomeIcon,
  TicketIcon,
  BanknotesIcon,
  CakeIcon,
  ChatBubbleLeftRightIcon,
  BriefcaseIcon,
  MapIcon
} from "@heroicons/react/24/solid";

import logo_navbar from '../Assets/logo_nav.png'
 
const navListMenuItems = [
  {
    title: "Animation Jeu",
    icon: PuzzlePieceIcon,
  },
  {
    title: "Acceuil",
    icon: HomeIcon,
  },
  {
    title: "Vente - Restauration",
    icon: BanknotesIcon,
  },
  {
    title: "Cuisine",
    icon: CakeIcon,
  },
  {
    title: "Tambola",
    icon: TicketIcon,
  },
  {
    title: "Forum Association",
    icon: ChatBubbleLeftRightIcon,
  },
];

const navListMenuItems2 = [
    {
      title: "Calendrier Post",
      icon: BriefcaseIcon,
    },
    {
      title: "Calendrier Espace Animation",
      icon: MapIcon,
    },
  ];
 
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title }, key) => (
    
        <Link to={`/${title}`} key={key}>        
            <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              className="flex items-center text-sm font-bold text-black"
            >
              {title}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    ),
  );
 
  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-indigo-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Informations
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavListMenu2() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const renderItems = navListMenuItems2.map(
      ({ icon, title }, key) => (
        <Link to={`/${title}`} key={key}>
          <MenuItem className="flex items-center gap-3 rounded-lg">
            <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-1 ">
              {" "}
              {React.createElement(icon, {
                strokeWidth: 2,
                className: "h-6 text-gray-900 w-6",
              })}
            </div>
            <div>
              <Typography
                variant="h6"
                className="flex items-center text-sm font-bold text-black"
              >
                {title}
              </Typography>
            </div>
          </MenuItem>
        </Link>
      ),
    );
    return (
        <React.Fragment>
          <Menu
            open={isMenuOpen}
            handler={setIsMenuOpen}
            offset={{ mainAxis: 20 }}
            placement="bottom"
            allowHover={true}
          >
            <MenuHandler>
              <Typography as="div" variant="small" className="font-medium">
                <ListItem
                  className="flex items-center gap-2 py-2 pr-4 font-medium text-indigo-900"
                  selected={isMenuOpen || isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                >
                  Calendrier
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`hidden h-3 w-3 transition-transform lg:block ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`block h-3 w-3 transition-transform lg:hidden ${
                      isMobileMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </ListItem>
              </Typography>
            </MenuHandler>
            <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
              <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
                {renderItems}
              </ul>
            </MenuList>
          </Menu>
          <div className="block lg:hidden">
            <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
          </div>
        </React.Fragment>
      );
}
 
function NavList() {
    return (
      <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
        <Typography
          as={Link}
          to="/home" 
          variant="small"
          className="font-medium text-indigo-900"
        >
          <ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem>
        </Typography>
        <NavListMenu />
        <NavListMenu2/>

        <Typography
          as={Link}
          to="/hebergement" 
          variant="small"
          className="font-medium text-indigo-900"
        >
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            Hebergement
          </ListItem>
        </Typography>
      </List>
    );
  }
 
export function NavbarWithMegaMenu() {
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-0">
      <div className="flex items-center justify-between text-indigo-900">
          <Link to="/home">
          <img
            src={logo_navbar}
            alt=""
            className="mr-4 cursor-pointer py-1.5 lg:ml-2 h-20"
          />
        </Link>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
            <Link to="/profil" className="text-indigo-900">
                <Button
                size="sm"
                variant="outlined"
                >Profil</Button> 
            </Link>
            <Link to="/" className="text-indigo-900">
            <Button variant="gradient" size="sm">
                Se connecter
            </Button>
            </Link>
        </div>
        <IconButton
          variant="text"
          className="lg:hidden text-indigo-900"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
        <Link to="/profil" className="text-indigo-900">
          <Button
            variant="outlined"
            size="sm">
            Profil
          </Button>
          </Link>
          <Link to="/" className="text-indigo-900">

          <Button variant="gradient" size="sm" fullWidth>
            Se connecter
          </Button>
          </Link>
        </div>
      </Collapse>
    </Navbar>
  );
}