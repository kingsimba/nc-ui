import { useState } from 'react';
import { CategoryPicker, type CategoryPickerItem } from '../../../src';

const productCategories: CategoryPickerItem[] = [
    {
        value: 'sensors', name: '传感器/雷达', children: [
            { value: 'lidar', name: '激光雷达' },
            { value: 'radar', name: '毫米波雷达' },
            { value: 'camera', name: '摄像头/视觉模组' },
            { value: 'imu', name: 'IMU/陀螺仪', description: '惯性测量单元' },
            { value: 'ultrasonic', name: '超声波传感器' },
            { value: 'encoder', name: '编码器' },
        ]
    },
    {
        value: 'controllers', name: 'PCB/控制器', children: [
            { value: 'mainboard', name: '主控板' }, { value: 'controller', name: '控制器' },
        ]
    },
    { value: 'assemblies', name: '组件/总成', children: [{ value: 'assembly', name: '组件' }] },
    { value: 'display', name: '显示', children: [{ value: 'screen', name: '屏幕' }] },
    { value: 'motor', name: '电机', children: [{ value: 'servo', name: '伺服电机' }] },
    { value: 'fasteners', name: '紧固件' },
];

const faultCategories: CategoryPickerItem[] = [
    { value: 'hardware', name: '硬件故障', children: [{ value: 'hardware-other', name: '其他故障' }] },
    { value: 'power', name: '电源问题', children: [{ value: 'battery-fault', name: '电池故障' }] },
    {
        value: 'peripheral', name: '外设故障', children: [
            { value: 'drive-fault', name: '驱动故障' }, { value: 'lift-fault', name: '顶升故障' },
            { value: 'charging-fault', name: '充电桩故障' }, { value: 'button-fault', name: '按钮故障' },
            { value: 'screen-fault', name: '屏幕故障' }, { value: 'lidar-fault', name: '激光雷达故障' },
            { value: 'IMU故障' }, { value: 'depth-camera-fault', name: '深度相机故障' },
        ]
    },
    { value: 'communication', name: '接口通信问题', children: [] },
    { value: 'network', name: '网络问题', children: [] },
    { value: 'software', name: '软件故障', children: [] },
];

export function CategoryPickerSection() {
    const [product, setProduct] = useState<string | null>('imu');
    const [fault, setFault] = useState<string | null>('lidar-fault');
    return <section className="dev-section">
        <h2>CategoryPicker</h2>
        <div className="dev-col">
            <h3>产品分类</h3>
            <CategoryPicker options={productCategories} value={product} onChange={setProduct}
                placeholder="选择分类" searchPlaceholder="搜索分类..." emptyText="没有匹配的分类"
                allowAllOptions getAllOptionName={(category) => `全部${category.name ?? category.value}`}
                getAllOptionDescription={() => '包含该分类下所有子类'} />
            <h3>故障分类</h3>
            <CategoryPicker options={faultCategories} value={fault} onChange={setFault}
                placeholder="选择分类" searchPlaceholder="搜索分类..." emptyText="没有匹配的分类"
                clearable clearLabel="清除分类" showFullPath={false} />
        </div>
    </section>;
}