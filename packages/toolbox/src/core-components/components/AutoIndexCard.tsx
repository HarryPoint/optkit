import { Card, ConfigProvider, GetProps } from "antd";
import { createStyles } from "antd-style";
import { useContext } from "react";

type AutoIndexCardProps = GetProps<typeof Card>;

const useCardStyle = () => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const selectPrefixCls = getPrefixCls("card");
  return createStyles(({ css }) => ({
    card: css`
      .${selectPrefixCls}-head-title::before {
        counter-increment: section;
        content: counter(section) ". ";
      }
    `,
  }))();
};

export const AutoIndexCard: React.FC<AutoIndexCardProps> = (props) => {
  const { styles } = useCardStyle();
  return (
    <ConfigProvider
      card={{
        className: styles.card,
      }}
    >
      <Card {...props} />
    </ConfigProvider>
  );
};

type AutoIndexCardRestProps = {
  children?: React.ReactNode;
};

export const AutoIndexCardRest: React.FC<AutoIndexCardRestProps> = ({
  children,
}) => {
  return <div style={{ counterReset: "section" }}>{children}</div>;
};
