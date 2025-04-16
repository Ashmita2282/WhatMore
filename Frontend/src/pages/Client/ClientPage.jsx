import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import DashboardContent from '../../components/ClientPanel/DashboardContent';
import ReportsContent from '../../components/ClientPanel/ReportsContent';
import ProfileContent from '../../components/ClientPanel/ProfileContent';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';// import StoreIcon from '@mui/icons-material/Store';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


// Navigation items
const NAVIGATION = [
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'reports', title: 'Reports', icon: <BarChartIcon /> },
  { segment: "profile", title: "Profile", icon: <AccountCircleIcon />, position: "bottom" },
  { segment: "login", title: "Log Out", icon: <ExitToAppIcon />, position: "bottom" }, // New Login Option
];

// Theme configuration
const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
  colorSchemes: { light: true, dark: true },
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
});

// Component to handle page rendering based on selected navigation
function DemoPageContent({ pathname, count }) {
  switch (pathname) {
    case '/dashboard':
      return <DashboardContent count={count} />;
    case '/reports':
      return <ReportsContent count={count} />;
    case '/profile':
      return <ProfileContent count={count} />;
    case '/login':
      window.location.href = "/login"; // Redirect to login page
      return null;
    default:
      return <Typography variant="h5">Page Not Found</Typography>;
  }}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
  count: PropTypes.number, // Add this line
};

function DashboardLayoutBranding(props) {
  const { window, count} = props;
  const router = useDemoRouter('/dashboard');
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="./images/vidscommerce.png" alt="Vidscommerce logo" className="h-8" />,
        title: (
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
            }}
          >
            Insta Videos
          </Typography>
        ),
        homeUrl: '/toolpad/core/introduction',
      }}
      
            
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        {/* Render content based on selected navigation */}
        <DemoPageContent pathname={router.pathname} count={count}/>
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBranding.propTypes = {
  window: PropTypes.func,
  count: PropTypes.number, // Add this line
};


export default DashboardLayoutBranding;

