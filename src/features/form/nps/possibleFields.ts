import { ImageFieldModule } from "../../../components/formFields/Image";
import { MultipleChoiceModule } from "../../../components/formFields/MultipleChoice";
import { npsFieldModule } from "../../../components/formFields/Nps";
import { textFieldModule } from "../../../components/formFields/Text";
import { titleFieldModule } from "../../../components/formFields/Title";

export const possibleFields = {
    title: titleFieldModule,
    text: textFieldModule,
    nps: npsFieldModule,
    multipleChoice: MultipleChoiceModule,
    image: ImageFieldModule
}