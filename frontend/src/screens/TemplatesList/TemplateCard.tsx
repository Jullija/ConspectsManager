import { Button } from 'semantic-ui-react';
import { colors } from '../../utils/colors';
import { Template, TemplateFolder } from '../../utils/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { subtitleFontSize } from '../../utils/sizes';

interface TemplateCardProps {
  template: Template;
  handleDelete: () => void;
}

const TemplateCard = ({ template, handleDelete }: TemplateCardProps) => {
  const getFolderTreeElememt = (structure: TemplateFolder[]): React.ReactElement | null => {
    const createTree = (node: TemplateFolder): React.ReactElement | null => {
      const children = structure.filter((child) => child.parent === node.folder);
      if (children.length === 0) {
        return <div key={node.folder}>📁 {node.folder}</div>;
      }

      return (
        <div key={node.folder}>
          📁 {node.folder}
          <div style={{ marginLeft: '20px' }}>{children.map((child) => createTree(child))}</div>
        </div>
      );
    };

    const rootNode = structure.find((node) => node.parent.startsWith('root-edition'));

    if (!rootNode) {
      console.error('Root node not found!');
      return null;
    }

    return createTree(rootNode);
  };

  return (
    <div
      style={{
        padding: 20,
        width: 340,
        height: 400,
        borderRadius: 15,
        backgroundColor: colors.white,
        color: colors.darkblue
      }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 20,
          borderBottom: '1px solid ' + colors.grey,
          marginBottom: 20
        }}>
        <div style={{ fontSize: subtitleFontSize }}>{template.name}</div>
        <Button
          onClick={handleDelete}
          style={{ backgroundColor: colors.orange, padding: '8px 12px' }}>
          <FontAwesomeIcon icon={faTrash} color={colors.darkblue} fontSize={12} />
        </Button>
      </div>
      <div>{getFolderTreeElememt(template.folders)}</div>
    </div>
  );
};

export default TemplateCard;
