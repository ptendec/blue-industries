import { Flex } from "@mantine/core";
import { Filter } from "../components/Common/Filter";
import NoSSR from "../components/Common/NoSSR";
import Sidebar from "../components/Common/Sidebar";
import { Day } from "../components/Table/Day";

export default function MainPage() {
  return (
    <NoSSR>
      <Flex>
        <Sidebar />
        <div
          style={{
            padding: "0 32px",
            marginBottom: "80px",
          }}
        >
          <Filter />
          <Day />
        </div>
      </Flex>
    </NoSSR>
  );
}
