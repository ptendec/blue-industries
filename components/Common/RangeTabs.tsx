import { Tabs } from "@mantine/core";
import { useRouter } from "next/router";
import { Day } from "../Table/Day";

export const RangeTabs = () => {
  const router = useRouter();

  const activeTab = router.query.tab as string;

  return (
    <Tabs value={activeTab} defaultValue="day">
      <Tabs.List>
        <Tabs.Tab
          style={{
            fontSize: 18,
            fontWeight: 500,
          }}
          value="day"
        >
          Day
        </Tabs.Tab>
        <Tabs.Tab
          style={{
            fontSize: 18,
            fontWeight: 500,
          }}
          value="week"
        >
          Week
        </Tabs.Tab>
        <Tabs.Tab
          style={{
            fontSize: 18,
            fontWeight: 500,
          }}
          value="month"
        >
          Month
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="day">
        <Day />
      </Tabs.Panel>
      {/* <Tabs.Panel value="week"></Tabs.Panel> */}
      {/* <Tabs.Panel value="month"></Tabs.Panel> */}
    </Tabs>
  );
};
