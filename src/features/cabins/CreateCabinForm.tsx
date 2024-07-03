import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import Input from "../../ui/Input";
import { Textarea } from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm(
  {
    cabinToEdit = {},
    onClose,
  }: {
    cabinToEdit: Partial<{ id: string, editValues: string}>,
    onClose?: () => void
  },
) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const isWorking = isCreating || isEditing;

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        { onSuccess: () => {
          reset();
          onClose?.();
        } },
      );
    } else {
      createCabin(
        { ...data, image },
        { onSuccess: () => {
          reset();
          onClose?.();
        } },
      );
    }
  };

  const onError = (errors: Error) => {
    console.error(errors);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onClose ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register(
            "name",
            { required: "This field is required" },
          )}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          disabled={isWorking}
          {...register(
            "max_capacity",
            {
              required: "This field is required",
              min: {
                value: 1,
                message: "Capacity should be at least 1",
              },
            },
          )}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          disabled={isWorking}
          {...register(
            "regular_price",
            {
              required: "This field is required",
              min: {
                value: 1,
                message: "Price should be at least 1",
              },
            },
          )}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register(
            "discount",
            {
              required: "This field is required",
              validate: (value) => {
                return value <= getValues().regular_price || "Discount should be less than regular price";
              },
            },
          )}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register(
            "description",
            { required: "This field is required" },
          )}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          type="file"
          accept="image/*"
          disabled={isWorking}
          {...register(
            "image",
            { required: isEditSession ? false : "This field is required" },
          )}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isWorking}
          onClick={() => onClose?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>{ isEditSession ? "Edit cabin" : "Add cabin" }</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;