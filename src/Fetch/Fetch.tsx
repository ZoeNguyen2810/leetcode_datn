// import { useEffect, useState } from "react";
// import axios from "axios";
// import moment from "moment/moment";
// const useFetch = (url , isCovidData) => {
//   // nho truyen bien nha
//   const [dataCovid, setDataCovid] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   useEffect(() => {
//     setTimeout(() => {
//       // try{
//       const ourRequest = axios.CancelToken.source(); // <-- 1st step

//       const Res1 = async () => {
//         try {
//           let res = await axios.get(url, {
//             cancelToken: ourRequest.token, // <-- 2nd step
//           });
//           let data = res && res.data ? res.data.data : [];
//           if (data && data.length > 0 && isCovidData === true) {
//             data.map((item) => {
//               item.Date = moment(item.Date).format("DD/MM/YYYY");
//               return item;
//             });
//           }
//           // console.log(data)
//           setLoading(false);
//           setDataCovid(data);
//           // console.log(dataCovid);
//         } catch (e) {
//           if (axios.isCancel(e)) {
//             console.log("Request canceled", e.message);
//           } else {
//             // handle error
//           }
//           alert("Zoe bug");
//           setIsError(true);
//           setLoading(false);
//         }
//         return () => {
//           ourRequest.cancel('oer'); // <-- 3rd step
//         };
//       };

//       Res1();
//       // }
//       // catch(e) {
//       //   alert('Zoe Error' + e.message)
//       // }
//     }, 2000);
//   }, []);
//   return { dataCovid, loading, isError };
// };

// export default useFetch;

const Fetch = () => {
    return (
        <div>Zoe</div>
    )
}