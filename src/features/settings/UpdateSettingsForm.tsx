import Form from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useUpdateSettings } from "./useEditSettings";
import { useSettings } from "./useSettings";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      min_booking_length,
      max_booking_length,
      max_guests_per_booking,
      breakfast_price,
    } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSettings();

  if (isLoading) {
    return <Spinner />;
  }

  const handleUpdate = (event, field) => {
    const { value } = event.target;
    if (!value) {
      return;
    }

    updateSetting({
      [field]: value,
    });
  };

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input disabled={ isUpdating } type="number" id="min-nights" defaultValue={ min_booking_length } onBlur={(event) => handleUpdate(event, "min_booking_length") } />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input type="number" id="max-nights" defaultValue={ max_booking_length } onBlur={(event) => handleUpdate(event, "max_booking_length") } />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input type="number" id="max-guests" defaultValue={ max_guests_per_booking } onBlur={(event) => handleUpdate(event, "max_guests_per_booking") } />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input type="number" id="breakfast-price" defaultValue={ breakfast_price } onBlur={(event) => handleUpdate(event, "breakfast_price") } />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
