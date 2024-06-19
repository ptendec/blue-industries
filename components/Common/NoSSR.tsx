import dynamic from "next/dynamic";
import React, { ComponentPropsWithoutRef } from "react";

const NoSSR = (props: ComponentPropsWithoutRef<any>) => (
  <React.Fragment>{props.children}</React.Fragment>
);

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
});
