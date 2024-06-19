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
        <Flex direction="column" align="flex-start" mx={20}>
          <Filter />
          <Day />
        </Flex>
      </Flex>
    </NoSSR>
  );
}
