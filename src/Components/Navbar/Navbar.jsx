import React from "react";
  import { Link } from "react-router-dom";
  import { useNavigate } from "react-router-dom";
  import axiosInstance from '../../config/axiosConfig';



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
    ArrowDownOnSquareIcon,
    DocumentPlusIcon
  } from "@heroicons/react/24/outline";
  import {
    PuzzlePieceIcon,
    HomeIcon,
    TicketIcon,
    BanknotesIcon,
    CakeIcon,
    ChatBubbleLeftRightIcon,
    BriefcaseIcon,
    MapIcon,
    UserGroupIcon
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
          ({ icon, title }, key) => {
              
              const url = `/${title.toLowerCase().replace(/\s+/g, '_')}`;
              return(
          <Link to={url} key={key}>        
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
      
    );
  });
  
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
                  className={`hidden h-3 w-3 lg:block ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`block h-3 w-3 lg:hidden ${
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
          ({ icon, title }, key) => {
              
              const url = `/${title.toLowerCase().replace(/\s+/g, '_')}`;
              return(
          <Link to={url} key={key}>        
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
      
    );
  });
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
                      className={`hidden h-3 w-3  lg:block ${
                        isMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`block h-3 w-3  lg:hidden ${
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

  const DashBoardItems = [
    
    {
      title: "Importer un CSV",
      icon: ArrowDownOnSquareIcon      ,
    },
    {
      title: "Gestion des demandes",
      icon: DocumentPlusIcon,
    },
    {
      title: "Gestion utilisateur",
      icon: UserGroupIcon,
    },
  ];
  
  function DashboardMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
    const renderItems = DashBoardItems.map(({ icon, title }, key) => {
      const url = `/${title.toLowerCase().replace(/\s+/g, '_')}`;
  
      
      return (
        <Link to={url} key={key}>
          <MenuItem className="flex items-center gap-3 rounded-lg">
            <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2">
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
      );
    });
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
                Tableau de bord
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`hidden h-3 w-3  lg:block ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`block h-3 w-3  lg:hidden ${
                    isMobileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </ListItem>
            </Typography>
          </MenuHandler>
          <MenuList className="max-w-screen-xl rounded-xl lg:block">
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
  
  export function NavbarWithMegaMenu() {
      
    const [openNav, setOpenNav] = React.useState(false);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [chercheHebergement, setChercheHebergement] = React.useState(false);


     

    const navigate = useNavigate();

  
    React.useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false),
      );

    }, []);

      // Vérification de l'authentification
      React.useEffect(() => {
        const authenticated = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(authenticated);

        const cherche = parseInt(localStorage.getItem('cherche_hebergement')) === 1;
        setChercheHebergement(cherche);
      }, []);

      const handleLogout = () => {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('user');
          localStorage.setItem('isAuthenticated',false);
          setIsAuthenticated(false);
          navigate("/");
      };

      

  
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
          <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
          <Typography 
            as={Link}
            to="/home" 
            variant="small"
            className="font-medium text-indigo-900"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">Accueil</ListItem>
          </Typography>
          <NavListMenu />
          <NavListMenu2/>
          
          <Typography 
            as={Link}
            to="/jeux" 
            variant="small"
            className="font-medium text-indigo-900"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">Jeux</ListItem>
          </Typography>
          
          {chercheHebergement && (

          <Typography
            as={Link}
            to="/hebergement" 
            variant="small"
            className="font-medium text-indigo-900"
          >
            <ListItem className={`flex items-center gap-2 py-2 pr-4`}>
              Hebergement
            </ListItem>
          </Typography>
          )}
          <DashboardMenu />

        </List>
          </div>
          <div className="hidden gap-2 lg:flex">
          {isAuthenticated && (
              <Link to="/profil" className=" rounded-lg">
                  <Button
                  size="sm"
                  variant="outlined"
                  className="rounded-lg"
                  >Profil</Button> 
              </Link>
              )}
              <Link to="/" className="text-indigo-900">
                  <Button 
                      onClick={isAuthenticated ? handleLogout : null}
                      className="bg-indigo-900" 
                      size="sm"
                      
                      >
                      {isAuthenticated ? "Se déconnecter" : "Se connecter"}
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

          {chercheHebergement && (

          <Typography
            as={Link}
            to="/hebergement" 
            variant="small"
            className="font-medium text-indigo-900"
          >
            <ListItem className={`flex items-center gap-2 py-2 pr-4`}>
              Hebergement
            </ListItem>
          </Typography>
          )}
           <DashboardMenu />

        </List>
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          {isAuthenticated && ( 

          <Link to="/profil" className="text-indigo-900">
            <Button
              variant="outlined"
              size="sm">
              Profil
            </Button>
            </Link>
            )}
            <Link to="/" className="text-indigo-900">
              <Button 
                  onClick={isAuthenticated ? handleLogout : null}
                  className="bg-indigo-900" 
                  size="sm">
                  {isAuthenticated ? "Se déconnecter" : "Se connecter"}
              </Button>
            </Link>
          </div>
        </Collapse>

      </Navbar>
    );
  }
