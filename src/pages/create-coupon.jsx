import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import dayjs from 'dayjs';
import { TextField, Select, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

import { httpService } from '../service';
import { useNavigate } from 'react-router-dom';

function defaultCouponState() {
  return {
    code: '',
    discount_type: 'percentage',
    discount_value: 0,
    expiration_date: dayjs(),
    max_usage: 1,
  };
}
export default function createCoupon() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [coupon, setCoupon] = useState({ ...defaultCouponState() });
  const [loading, setLoading] = useState(false);

  async function fetchCoupon() {
    if (id) {
      try {
        setLoading(true);
        const resp = await httpService.get(`/admin/coupons/${id}/get`);
        const data = resp.data.data;
        delete data.id;
        delete data.created_at;
        delete data.updated_at;
        setCoupon(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  function updateStateHandler(key, value) {
    setCoupon((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  async function updateCoupon() {
    try {
      // todo:: validate the coupon before
      setLoading(true);

      const resp = await httpService.post(
        `/admin/coupons/${id}/update`,
        coupon
      );
      console.log(resp.data);
      navigate('/coupons');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function createNewCoupon() {
    try {
      // todo:: validate the coupon before
      setLoading(true);

      const resp = await httpService.post(`/admin/coupons/create`, coupon);
      console.log(resp.data);
      navigate('/coupons');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCoupon();
  }, [id]);

  return (
    <div>
      <h1> {id ? 'Update Coupon' : 'Create New Coupon'} </h1>
      <TextField
        id="code"
        label="Code"
        variant="outlined"
        placeholder="Code"
        onChange={(e) => updateStateHandler('code', e.target.value)}
        value={coupon.code}
      />

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Discount Type"
        value={coupon.discount_type}
        onChange={(e) => updateStateHandler('discount_type', e.target.value)}
        style={{ minWidth: '150px' }}
      >
        <MenuItem value="percentage">Percentage</MenuItem>
        <MenuItem value="flat">Flat</MenuItem>
      </Select>

      <TextField
        id="discount_value"
        label="Discount Value"
        variant="outlined"
        placeholder="Discount Value"
        onChange={(e) => updateStateHandler('discount_value', e.target.value)}
        value={coupon.discount_value}
        type="number"
      />
      <TextField
        id="max_usage"
        label="Max Usage"
        variant="outlined"
        onChange={(e) => updateStateHandler('max_usage', e.target.value)}
        value={coupon.max_usage}
        type="number"
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          format="YYYY-MM-DD"
          minDate={dayjs()}
          value={dayjs(coupon.expiration_date)}
          onChange={(e) =>
            updateStateHandler('expiration_date', e.format('YYYY-MM-DD'))
          }
        />
      </LocalizationProvider>

      <LoadingButton
        loading={loading}
        onClick={id ? updateCoupon : createNewCoupon}
      >
        {id ? 'Update' : 'Create'}
      </LoadingButton>
    </div>
  );
}
