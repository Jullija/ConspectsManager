import { useNavigate, useParams } from 'react-router-dom';
import { pathGenerator } from '../../router/paths';
import { Button, Form, FormField, FormGroup, Select } from 'semantic-ui-react';
import { useState } from 'react';
import { subtitleFontSize, titleFontSize } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { addEdition } from '../../api/editions';
import axios from 'axios';
import { AddEditionTemplateList } from './AddEditionTemplateList';
import { yearOptions } from './YearOptions';

const AddEdition = () => {
  const params = useParams();
  const subjectId = Number(params.subjectId);

  const navigate = useNavigate();

  const [editionName, setEditionName] = useState<string>();
  const [year, setYear] = useState<number>(-1);
  const isFormValid = !(editionName === undefined || editionName === '' || year === -1);

  const handleCancel = () => {
    navigate(pathGenerator.subject(subjectId));
  };

  const handleConfrim = async () => {
    if (isFormValid) {
      try {
        await addEdition(subjectId, editionName, year);
        navigate(pathGenerator.subject(subjectId));
      } catch (error) {
        navigate(
          pathGenerator.ErrorPage(
            axios.isAxiosError(error)
              ? JSON.stringify(error.response?.data)
              : 'Something went wrong :('
          )
        );
      }
    }
  };

  return (
    <div style={{ color: colors.darkblue }}>
      <Form>
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 8 }}>
          <div style={{ fontSize: titleFontSize, margin: '24px 20px' }}>
            Utwórz edycję dla przedmiotu
          </div>

          <div>
            <div style={{ fontSize: subtitleFontSize, margin: '24px 20px' }}>
              Podstawowe informacje:
            </div>

            <FormGroup widths="equal">
              <FormField>
                <label>Nazwa</label>
                <input
                  placeholder="Nazwa edycji"
                  onChange={(e) => setEditionName(e.target.value)}
                />
              </FormField>

              <FormField
                control={Select}
                label="Rok"
                options={yearOptions}
                placeholder="Rok edycji"
                value={year}
                onChange={(e: any, data: any) => {
                  setYear(data.value);
                }}
              />
            </FormGroup>
          </div>

          <div>
            <div style={{ fontSize: subtitleFontSize, margin: '24px 20px' }}>Wybór templatki*</div>
            <AddEditionTemplateList />
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button
              onClick={handleCancel}
              style={{ backgroundColor: colors.grey, marginRight: 12 }}
              size="big">
              anuluj
            </Button>
            <Button
              onClick={handleConfrim}
              style={{ backgroundColor: colors.darkblue, color: colors.white }}
              disabled={!isFormValid}
              size="big">
              dodaj
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddEdition;
