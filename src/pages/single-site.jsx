import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { httpService } from '../service';

export default function singleSite() {
  const { id } = useParams();
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getSiteDetails() {
    try {
      setLoading(true);
      // const resp = await httpService.
      //   api/shopify/1/get-settings
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSiteDetails();
  }, []);

  return <div>single-site {id}</div>;
}
