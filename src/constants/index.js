import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export const BACKEND_BASE_URL = 'https://app.cannacabana.com/api';

export const ListItems = [
  {
    key: 'sites',
    to: '/',
    icon: ViewQuiltIcon,
    text: 'Sites',
  },
  {
    key: 'coupons',
    to: '/coupons',
    icon: LocalOfferIcon,
    text: 'Coupons',
  },
];
