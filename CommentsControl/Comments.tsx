import * as React from 'react';
import { ActivityItem, IStackProps, IStackStyles, Icon, Link, Separator, Stack, TextField, mergeStyleSets } from '@fluentui/react';
import { Enter } from '@fluentui/keyboard-keys';
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const stackTokens = { childrenGap: 50 };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 500 } },
};

type DataSet = ComponentFramework.PropertyTypes.DataSet;

export interface ICommentsGrid {
  pagerows: any,
  currentUserName: string,
  currentUserId: string,
  currentEntityId: string,
  currentEntityTypeName: string,
  webAPI: any,
  dataset: any,
  messageProperty: string,
  dateProperty: string,
  userProperty: string,
  parentLookUpProperty: string
}

const classNames = mergeStyleSets({
  exampleRoot: {
    marginTop: '20px',
    marginLeft: '5px'         
  },
  nameText: {
    fontWeight: 'bold',
  }
});

export const CommentsGrid = React.memo(({ pagerows, currentUserName, currentUserId, currentEntityId, currentEntityTypeName, webAPI, dataset, 
                                                      messageProperty, dateProperty, userProperty, parentLookUpProperty }: ICommentsGrid): JSX.Element => {
  const [state, setState] = React.useState<any[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null); 
  const [enteredText, setEnteredText] = React.useState(''); 
  let targetType = dataset.getTargetEntityType()
  React.useEffect(() => {
    const fetchData = () => {
      let autoGroupColumnDef = [];
      try {
        for (let i = 0; i < pagerows.length; i++) {
          let date = pagerows[i][dateProperty];
          autoGroupColumnDef.push({
            key: 0,
            activityDescription: [<Link
              key={1}
              className={classNames.nameText}
              onClick={() => {

              }}>{pagerows[i][userProperty]}</Link>,
            <span key={2}> commented</span>,
            ],
            activityIcon: pagerows[i][userProperty] == currentUserName ? <Icon iconName={'Message'} /> : <Icon iconName={'ReplyAll'} />,
            comments: [<span key={1}>{pagerows[i][messageProperty]}</span>],
            timeStamp: date
          });
        }
        setState(autoGroupColumnDef);
      } catch (error) {
        setState([]);
        console.log('error')
      }
    }
    fetchData();
  }, [pagerows]);
 
  const handleChange= (event: any) => {
    setEnteredText(event.target.value);
  }
  
  const onSendClick = (event: any) =>  {
    if (event.key === Enter && event.altKey == false && event.ctrlKey == false && event.shiftKey == false) {    
      let comment = event.target.value;                   
      let entity: any = {};
      entity[messageProperty]= comment;
      entity[parentLookUpProperty + '@odata.bind'] = "/" + currentEntityTypeName + "s(" + currentEntityId.replace("{", "").replace("}", "") + ")";     
      webAPI.createRecord(targetType, entity).then(
        function success() {
          console.log("success");  
          setEnteredText('');       
          dataset.refresh();
        },
        function (error: any) {
          console.log(error.message); 
          setEnteredText('');                                 
          dataset.refresh();
        }
      );
    }    
  }

  return (
    <div>
      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <Stack {...columnProps}>
          <div ref={containerRef} style={{ maxHeight: '300px', overflowY: 'scroll' }}>
            <TextField id='message' value={enteredText} onKeyDown={onSendClick} onChange={handleChange} multiline autoAdjustHeight />
          </div>
        </Stack>
      </Stack>
      {state.map((item: { key: string | number }) => (
        <ActivityItem {...item} key={item.key} className={classNames.exampleRoot} />
      ))},      
    </div>
  );
});
export default CommentsGrid;
