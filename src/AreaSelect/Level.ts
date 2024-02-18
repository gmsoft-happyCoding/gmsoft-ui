export enum LEVEL {
  /**
   * 省
   */
  MUN_PROVINCE = 1,
  /**
   * 直辖市, 直辖市下没有地级市, 直接下级为区, 县
   */
  MUN_CITY = 2,
  /**
   * 自治区
   */
  MUN_DISTRICT = 3,
  /**
   * 地级市
   */
  CITY = 4,
  /**
   * 区、县
   */
  COUNTY = 5,
}
