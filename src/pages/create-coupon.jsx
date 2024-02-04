import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import dayjs from "dayjs";
import {
  TextField,
  Select,
  MenuItem,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

import { httpService } from "../service";
import { useNavigate } from "react-router-dom";
import { PageLoader } from "../components";

function defaultCouponState() {
  return {
    code: "",
    discount_type: "percentage",
    discount_value: 0,
    expiration_date: dayjs(),
    max_usage: 1,
  };
}

export default function CreateCoupon() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [coupon, setCoupon] = useState({ ...defaultCouponState() });
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

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
      setBtnLoading(true);

      const resp = await httpService.post(
        `/admin/coupons/${id}/update`,
        coupon
      );
      console.log(resp.data);
      navigate("/coupons");
    } catch (error) {
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  }

  async function createNewCoupon() {
    try {
      // todo:: validate the coupon before
      setBtnLoading(true);

      const resp = await httpService.post(`/admin/coupons/create`, coupon);
      console.log(resp.data);
      navigate("/coupons");
    } catch (error) {
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  }

  useEffect(() => {
    fetchCoupon();
  }, [id]);

  if (loading) return <PageLoader />;

  return (
    <>
      <Typography gutterBottom variant="h5">
        {" "}
        {id ? "Update Coupon" : "Create New Coupon"}{" "}
      </Typography>

      <Stack gap="20px">
        <Box>
          <Typography gutterBottom>Code</Typography>
          <TextField
            size="small"
            id="code"
            placeholder="Code"
            onChange={(e) => updateStateHandler("code", e.target.value)}
            value={coupon.code}
            error={coupon.code === ""}
          />
        </Box>
        <Box>
          <Typography gutterBottom>Discount Type</Typography>

          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={coupon.discount_type}
            onChange={(e) =>
              updateStateHandler("discount_type", e.target.value)
            }
            style={{ minWidth: "150px" }}
          >
            <MenuItem value="percentage">Percentage</MenuItem>
            <MenuItem value="flat">Flat</MenuItem>
          </Select>
        </Box>

        <Box>
          <Typography gutterBottom>Discount Value</Typography>

          <TextField
            size="small"
            id="discount_value"
            InputProps={{ inputProps: { min: 0 } }}
            placeholder="Discount Value"
            onChange={(e) =>
              updateStateHandler("discount_value", e.target.value)
            }
            value={coupon.discount_value}
            error={coupon.discount_value === "0" || coupon.discount_value === 0}
            type="number"
          />
        </Box>

        <Box>
          <Typography gutterBottom>Max Usage</Typography>
          <TextField
            size="small"
            id="max_usage"
            onChange={(e) => updateStateHandler("max_usage", e.target.value)}
            value={coupon.max_usage}
            type="number"
          />
        </Box>

        <Box className="customDatePicker">
          <Typography gutterBottom>Expiration Date</Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="YYYY-MM-DD"
              minDate={dayjs()}
              value={dayjs(coupon.expiration_date)}
              onChange={(e) =>
                updateStateHandler("expiration_date", e.format("YYYY-MM-DD"))
              }
              sx={{
                height: "40px",
              }}
            />
          </LocalizationProvider>
        </Box>

        <Box>
          <LoadingButton
            variant="contained"
            loading={btnLoading}
            disabled={coupon.code === "" || coupon.discount_value === "0"}
            onClick={id ? updateCoupon : createNewCoupon}
          >
            {id ? "Update" : "Create"}
          </LoadingButton>
        </Box>
      </Stack>
    </>
  );
}
