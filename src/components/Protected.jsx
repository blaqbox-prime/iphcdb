import { Center, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";

const Protected = ({children}) => {
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/signin");
  }, [status]);

  if (status === "authenticated")
    return (
    <>
    {children}
    </>
    );

  return <Center>
    <CircularProgress isIndeterminate color="blue" />
    <CircularProgressLabel>Loading</CircularProgressLabel>
  </Center>;
};

export default Protected;