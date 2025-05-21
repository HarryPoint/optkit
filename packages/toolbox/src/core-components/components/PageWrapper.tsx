import { LeftOutlined } from "@ant-design/icons";
import { ProCardProps } from "@ant-design/pro-components";
import {
  FooterToolbar,
  PageContainer,
  PageContainerProps,
  ProCard,
} from "@ant-design/pro-components";
import { Button, Space, theme } from "antd";
import { merge } from "lodash";
import { useRouter } from "../../hooks/useRouter";

export type PageWrapperProps = PageContainerProps;

export const PageWrapper: React.FC<
  PageWrapperProps & { card?: false | ProCardProps; showBack?: boolean }
> = ({
  children,
  card = {},
  backIcon = (
    <Button type="link" icon={<LeftOutlined />} className="!px-0">
      Back
    </Button>
  ),
  onBack,
  showBack,
  footerToolBarProps,
  footer,
  ...reset
}) => {
  const { token } = theme.useToken();
  const router = useRouter();
  const routeBack = () => {
    router.back();
  };
  const onBackFn = onBack ?? routeBack;

  const showFooterToolbar = footer || footerToolBarProps;

  const footerToolBarMergeProps = merge(
    {
      style: {
        backgroundColor: "#fff",
      },
    },
    footerToolBarProps ?? {}
  );

  return (
    <PageContainer
      // backIcon={showBack ? backIcon : false}
      // onBack={onBackFn}
      breadcrumbRender={(_props, defaultDom) => {
        return (
          <div>
            <div>
              <div onClick={onBackFn}>{showBack ? backIcon : null}</div>
            </div>
            <div>{defaultDom}</div>
          </div>
        );
      }}
      tabProps={{
        type: "line",
        style: {
          backgroundColor: "#fff",
          padding: token.padding,
          borderRadius: token.borderRadius,
        },
      }}
      {...reset}
    >
      {card ? <ProCard {...(card as any)}>{children}</ProCard> : children}
      {showFooterToolbar && (
        <FooterToolbar {...footerToolBarMergeProps}>
          {footer ? <Space>{footer}</Space> : footerToolBarMergeProps?.children}
        </FooterToolbar>
      )}
    </PageContainer>
  );
};
