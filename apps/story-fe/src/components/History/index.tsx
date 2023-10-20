// By Jianqi Jin

import { MaskData } from "@/interface";
import { Avatar, Button, List, Space } from "antd";
import styles from "./index.module.scss";
import { useContainer } from "unstated-next";
import { MaskState } from "@/store/Mask";
import { Object } from "fabric";

const History = () => {
  const { maskData, rollbackMaskData } = useContainer(MaskState);
  return (
    <div>
      <h2>Operation History</h2>
      <List
        itemLayout="horizontal"
        dataSource={maskData.objects}
        className={styles.history}
        renderItem={(item: Object, index) => (
          <List.Item>
            <List.Item.Meta
            key={`${item.width}_${index}`}
              avatar={
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=1`}
                />
              }
              title={
                <div className="flex flex-row justify-between">
                  <div>{index} {item.type} added</div>
                  <Button
                    type="link"
                    onClick={() => {
                      //   handleChangeMaskData?.();
                      rollbackMaskData(index);
                    }}
                  >
                    Roll Back
                  </Button>
                </div>
              }
              description="Created at -s ago."
            />
          </List.Item>
        )}
      />
    </div>
  );
};
export default History;
