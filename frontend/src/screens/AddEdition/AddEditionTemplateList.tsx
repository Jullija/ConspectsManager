import { useQuery } from 'react-query';
import { pathGenerator } from '../../router/paths';
import { useNavigate } from 'react-router-dom';
import { getTemplates } from '../../api/templates';
import { AddEditionTemplateCard } from './AddEditionTemplateCard';

type AddEditionTemplateListProps = {
  handleTemplatePress: (templateId: number) => void;
  chosenTemplate: number;
};

export const AddEditionTemplateList = ({
  handleTemplatePress,
  chosenTemplate
}: AddEditionTemplateListProps) => {
  const navigate = useNavigate();
  const { isLoading, error, data: templates } = useQuery('templates', getTemplates);

  if (isLoading) return <p>Loading...</p>;
  if (error) navigate(pathGenerator.ErrorPage('something went wrong'));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        marginTop: 20,
        marginBottom: 20
      }}>
      {templates?.map((template, index) => (
        <AddEditionTemplateCard
          key={index}
          template={template}
          handleTemplatePress={() => {
            handleTemplatePress(template.id);
          }}
          isChosen={chosenTemplate === template.id}
        />
      ))}
    </div>
  );
};

export default AddEditionTemplateList;
