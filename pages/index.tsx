import { Flex } from "@mantine/core";
import { Filter } from "../components/Common/Filter";
import NoSSR from "../components/Common/NoSSR";
import Sidebar from "../components/Common/Sidebar";
import { Day } from "../components/Table/Day";
import { Month } from "../components/Table/Month";
import { Week4 } from "../components/Table/Week4";
import { Year } from "../components/Table/Year";
import { useEmployeeVisibilityStore } from "../store";

export default function MainPage() {
  const { type } = useEmployeeVisibilityStore();
  const showType = () => {
    switch (type) {
      case "week":
        return <Day />;
      case "month":
        return <Month />;
      case "4 week":
        return <Week4 />;
      case "year":
        return <Year />;
    }
  };
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
          <div
            style={{
              position: "relative",
              zIndex: "20",
              backgroundColor: "white",
            }}
          >
            {showType()}
          </div>
        </div>
      </Flex>
    </NoSSR>
  );
}
