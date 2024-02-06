import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { httpService } from '../service';
import {
  Box,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PageLoader } from '../components';

export default function SingleSite() {
  const { id } = useParams();
  const [site, setSite] = useState({});
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const defaultFields = [
    { store_id: id, key: 'moneris_store_id', value: '' },
    { store_id: id, key: 'moneris_api_token', value: '' },
    { store_id: id, key: 'moneris_checkout_id', value: '' },
    { store_id: id, key: 'sales_tax', value: '' },
    { store_id: id, key: 'payment_options', value: '' },
  ];

  const renderTitle = (key) => {
    return key === 'moneris_store_id'
      ? 'Moneris Store Id'
      : key === 'moneris_api_token'
      ? 'Moneris Api Token'
      : key === 'moneris_checkout_id'
      ? 'Moneris Checkout Id'
      : key === 'sales_tax'
      ? 'Sales Tax Percentage'
      : key === 'payment_options'
      ? 'Payment Options'
      : '';
  };

  async function getSiteDetails() {
    try {
      setLoading(true);
      const resp = await httpService.get(`/shopify/${id}/get-settings`);
      const { data } = await resp.data;

      if (data) {
        const updatedLibrary = defaultFields.map((field) => {
          const libraryField = data?.library?.find(
            (item) => item.key === field.key
          );
          return libraryField ? libraryField : field;
        });

        setSite(() => ({
          ...data,
          library: updatedLibrary,
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const updateLibrary = (key, value) => {
    const updatedLibrary = site.library.map((item) => {
      return item.key === key ? { ...item, value } : item;
    });
    setSite((prevSite) => ({ ...prevSite, library: updatedLibrary }));
  };

  const updateSite = async () => {
    try {
      setBtnLoading(true);
      const payload = { ...site };

      delete payload.name;
      const resp = await httpService.post(
        `/shopify/${id}/save-settings`,
        payload
      );
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    getSiteDetails();
  }, []);

  if (loading) return <PageLoader />;
  return (
    <>
      <Typography gutterBottom variant="h5">
        {site?.name}
      </Typography>
      <Grid rowGap={2} container>
        {site?.library?.map((field, idx) => {
          return (
            <Grid item md={6} lg={6} xl={6} key={idx}>
              <Typography variant="body2">{renderTitle(field.key)}</Typography>
              {field.key === 'payment_options' ? (
                <Select
                  size="small"
                  value={field.value || 'pay_now'}
                  onChange={(e) => updateLibrary(field.key, e.target.value)}
                  style={{ minWidth: '150px' }}
                >
                  <MenuItem value="pay_now">Pay now</MenuItem>
                  <MenuItem value="pay_at_pickup">Pay at pickup</MenuItem>
                  <MenuItem value="both">Both</MenuItem>
                </Select>
              ) : (
                <TextField
                  size="small"
                  variant="outlined"
                  value={field.value}
                  type={field.key === 'sales_tax' ? 'number' : 'text'}
                  onChange={(e) => updateLibrary(field.key, e.target.value)}
                />
              )}
            </Grid>
          );
        })}
        <Grid container item md={12} lg={12} xl={12}>
          <Box>
            <LoadingButton
              variant="contained"
              loading={btnLoading}
              onClick={updateSite}
            >
              Update
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
