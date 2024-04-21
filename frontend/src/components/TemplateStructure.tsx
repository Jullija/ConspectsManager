import { Template, TemplateFolder } from '../utils/types';

type TemplateStructureProps = {
  template: Template;
};

export const TemplateStructure = ({ template }: TemplateStructureProps) => {
  const structure = template.folders;

  const createTree = (node: TemplateFolder): React.ReactElement | null => {
    const children = structure.filter((child) => child.parent === node.folder);

    if (children.length === 0) {
      return (
        <div className="item" key={node.folder}>
          <i className="folder icon"></i>
          <div className="content">{node.folder}</div>
        </div>
      );
    }

    return (
      <div className="item" key={node.folder}>
        <i className="folder icon"></i>
        <div className="content">
          {node.folder}
          <div className="list" style={{ marginLeft: 16 }}>
            {children.map((child) => createTree(child))}
          </div>
        </div>
      </div>
    );
  };

  const rootNode = structure.find((node) => node.parent.startsWith('root-edition'));

  if (!rootNode) {
    console.error('Root node not found!');
    return <></>;
  }

  return <div className="ui list">{createTree(rootNode)}</div>;
};
