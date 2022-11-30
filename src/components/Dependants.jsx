import { Box, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { baseURL } from "../helpers";
import Link from "next/link";

function Dependants({ memberId, type }) {
  const [dependants, setDependants] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${baseURL}/api/member/${type}`, {
        method: "POST",
        body: JSON.stringify({ id: memberId }),
      });
      if (res.status == 200) {
        const data = await res.json();
        console.log(data);
        setDependants(data);
        setLoading(false);
      } else {
        toast({
          title: `Server error`,
          description: "Please Try again later",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    setLoading(true);

    fetchData();
    return () => {};
  }, [memberId]);

  return (
    <Box>
      {dependants &&
        dependants.map((dependant) => (
          <Box key={dependant._id} my={4}>
            <Link href={`/members/${dependant._id}`}>
              {`${dependant.firstNames} ${dependant.lastName}`}
            </Link>
          </Box>
        ))}
    </Box>
  );
}

export default Dependants;
