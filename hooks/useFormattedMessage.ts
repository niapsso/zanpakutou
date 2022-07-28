import { useIntl } from "react-intl";

const useFormattedMessage = (id: string) => useIntl().formatMessage({ id });

export default useFormattedMessage;
