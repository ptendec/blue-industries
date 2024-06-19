import { Flex } from "@mantine/core";
import { Filter } from "../components/Common/Filter";
import NoSSR from "../components/Common/NoSSR";
import { RangeTabs } from "../components/Common/RangeTabs";
import Sidebar from "../components/Common/Sidebar";

export default function MainPage() {
  return (
    <NoSSR>
      <Flex>
        <Sidebar />
        <Flex direction="column" align="flex-start">
          <Filter />
          <RangeTabs />
        </Flex>
      </Flex>
    </NoSSR>
  );
}
