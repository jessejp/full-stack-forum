import type { GetStaticPaths, GetStaticPropsContext, NextPage } from "next";
import React from "react";

interface ChangePasswordProps {}

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  return <div>token is {token}</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ token: string }>
) => {
  return {
    props: {
      token: context.params?.token,
    },
  };
};

export default ChangePassword;
