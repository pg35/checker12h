import Request from "../util/Request";
import * as T from "../../reducer/action";

export default function Exporting(props) {
  const { state, dispatch, repeatCount = 100 } = props;
  const { scan } = state;
  return (
    <Request
      {...props}
      useAjaxArgs={{
        ajax: {
          data: {
            action: "pxq_pgck_get_export_result",
            scan_id: scan.id
          }
        },
        repeatCount: repeatCount
      }}
      repeatCount={repeatCount}
      onComplete={(data) => {
        dispatch(
          T.createAction(T.SCAN, {
            status: "exported"
          })
        );
        dispatch(
          T.createAction(T.APP, {
            balance: data.balance
          })
        );
      }}
      messages={[
        "Generating report and PDF",
        "Report and PDF are ready",
        "Report and PDF generation timed out"
      ]}
    />
  );
}
