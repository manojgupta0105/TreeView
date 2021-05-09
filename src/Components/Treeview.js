import React, { useState } from 'react';

const Treeview = ({node, showInfoModal}) => {
  const [isVisible, toggleVisible] = useState(true);

  return (<ul className="tree-node" key={node.id}>
    <li>
      {node.children?.length > 0 && <span className="clickable" onClick={() => toggleVisible(!isVisible)}>{isVisible ? "-" : "+"}</span>}
      <span onClick={() => showInfoModal(node)}>{node.title}</span>
    </li>
    {node.children?.length > 0 && isVisible && (
      <ul>
        {
          node.children.map((data) => {
            return <Treeview key={data.id} node={data} showInfoModal={showInfoModal} />
          })
        }
      </ul>
    )}
  </ul>)
};

export default Treeview;
