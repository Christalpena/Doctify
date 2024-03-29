import {useState,ReactNode, SyntheticEvent} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DocumentationTemplate from '../documentation/documentationTemplate';
import ReadMe from '../readme';


interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props:any) {
  const [value, setValue] = useState(0);
  const {data,getUrl,postUrl,putUrl,deleteUrl,getFields,setGetFields,setRequiredGetFields,postFields,setPostFields,setRequiredPostFields,status} = props
  
  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 'auto' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"   textColor="secondary"
        indicatorColor="primary">
          <Tab label="PDF" {...a11yProps(0)} />
          <Tab label="README" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <DocumentationTemplate 
          data={data}
          getUrl={getUrl}
          postUrl={postUrl}
          putUrl={putUrl}
          deleteUrl={deleteUrl}
          getFields={getFields}
          setGetFields={setGetFields}
          setRequiredGetFields={setRequiredGetFields}
          postFields={postFields}
          setPostFields={setPostFields}
          setRequiredPostFields={setRequiredPostFields}
          status={status}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
          <ReadMe
            data={data}
            getUrl={getUrl}
            putUrl={putUrl}
            postUrl={postUrl}
            deleteUrl={deleteUrl}
            postFields={postFields}
            getFields={getFields}
            status={status}
          />
      </CustomTabPanel>
    </Box>
  );
}