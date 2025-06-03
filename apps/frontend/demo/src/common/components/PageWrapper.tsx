import { LeftOutlined } from "@ant-design/icons";
import {
  FooterToolbar,
  PageContainer,
  PageContainerProps,
  ProCard,
  ProCardProps,
} from "@ant-design/pro-components";
import { Button, Space, theme } from "antd";
import { merge } from "lodash";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export type PageWrapperProps = PageContainerProps;

export const PageWrapper: React.FC<
  PageWrapperProps & {
    card?: false | ProCardProps;
    showBack?: boolean;
  }
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
  const pathname = usePathname();

  const backPathname = useMemo(() => {
    const purePathname = pathname.replace(/\/\d+$/g, "");
    const combine = purePathname?.split("/")?.slice(0, -1)?.join("/");
    return combine;
  }, [pathname]);

  console.log("backPathname: ", pathname, "=>", backPathname);

  const { token } = theme.useToken();
  const router = useRouter();
  const routeBack = () => {
    const prev = window.location.href;
    router.back();
    setTimeout(() => {
      if (window.location.href === prev) {
        router.push(backPathname);
      }
    }, 300);
  };
  const onBackFn = onBack ?? routeBack;

  const disabledBack = useMemo(() => {
    if (onBack) {
      return false;
    }
    return backPathname === "/" || backPathname === "/sys";
  }, [onBack, backPathname]);

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
      breadcrumbRender={(_props, defaultDom) => {
        return (
          <div>
            <div>
              <Button
                type="link"
                disabled={disabledBack}
                className="!px-0"
                onClick={onBackFn}
              >
                {showBack ? backIcon : null}
              </Button>
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
